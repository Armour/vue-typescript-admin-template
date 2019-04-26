<template>
  <div class="app-container">
    <el-button
      type="primary"
      @click="handleAddRole"
    >
      {{ $t('permission.addRole') }}
    </el-button>

    <el-table
      :data="rolesList"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column
        align="center"
        label="Role Key"
        width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Role Name"
        width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        align="header-center"
        label="Description"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Operations"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope)"
          >
            {{ $t('permission.editPermission') }}
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope)"
          >
            {{ $t('permission.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType==='edit'?'Edit Role':'New Role'"
    >
      <el-form
        :model="role"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="Name">
          <el-input
            v-model="role.name"
            placeholder="Role Name"
          />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesTreeData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button
          type="danger"
          @click="dialogVisible=false"
        >
          {{ $t('permission.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="confirmRole"
        >
          {{ $t('permission.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Component, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { Tree } from 'element-ui'
import { AppModule } from '@/store/modules/app'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'

interface Role {
  key: string
  name: string
  description: string
  routes: RouteConfig[]
}

interface RoutesTreeData {
  children: RoutesTreeData[]
  title: string
  path: string
}

const defaultRole: Role = {
  key: '',
  name: '',
  description: '',
  routes: []
}

@Component
export default class RolePermission extends Vue {
  private role = defaultRole
  private reshapedRoutes: RouteConfig[] = []
  private serviceRoutes: RouteConfig[] = []
  private rolesList: Role[] = []
  private dialogVisible = false
  private dialogType = 'new'
  private checkStrictly = false
  private defaultProps = {
    children: 'children',
    label: 'title'
  }

  get routesTreeData() {
    return this.generateTreeData(this.reshapedRoutes)
  }

  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  }

  private async getRoutes() {
    const res = await getRoutes()
    this.serviceRoutes = res.data
    this.reshapedRoutes = this.reshapeRoutes(res.data)
  }

  private async getRoles() {
    const res = await getRoles()
    this.rolesList = res.data
  }

  private generateTreeData(routes: RouteConfig[]) {
    const data: RoutesTreeData[] = []
    for (let route of routes) {
      const tmp: RoutesTreeData = {
        children: [],
        title: '',
        path: ''
      }
      tmp.title = this.$t(`route.${route.meta.title}`).toString()
      tmp.path = route.path
      if (route.children) {
        tmp.children = this.generateTreeData(route.children)
      }
      data.push(tmp)
    }
    return data
  }

  // Reshape the routes structure so that it looks the same as the sidebar
  private reshapeRoutes(routes: RouteConfig[], basePath = '/') {
    const res: RouteConfig[] = []
    for (let route of routes) {
      // Skip hidden routes
      if (!route.meta || route.meta.hidden) {
        continue
      }
      const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
      if (route.children && onlyOneShowingChild && (!route.meta || !route.meta.alwaysShow)) {
        route = onlyOneShowingChild
      }
      const data: RouteConfig = {
        path: path.resolve(basePath, route.path),
        meta: {
          title: route.meta && route.meta.title
        }
      }
      // Recursive generate child routes
      if (route.children) {
        data.children = this.reshapeRoutes(route.children, data.path)
      }
      res.push(data)
    }
    return res
  }

  private flattenRoutes(routes: RouteConfig[]) {
    let data: RouteConfig[] = []
    routes.forEach(route => {
      data.push(route)
      if (route.children) {
        const temp = this.flattenRoutes(route.children)
        if (temp.length > 0) {
          data = [...data, ...temp]
        }
      }
    })
    return data
  }

  private handleAddRole() {
    this.role = defaultRole
    if (this.$refs.tree) {
      (this.$refs.tree as Tree).setCheckedKeys([])
    }
    this.dialogType = 'new'
    this.dialogVisible = true
  }

  private handleEdit(scope: any) {
    this.dialogType = 'edit'
    this.dialogVisible = true
    this.checkStrictly = true
    this.role = scope.row
    this.$nextTick(() => {
      const routes = this.flattenRoutes(this.reshapeRoutes(this.role.routes))
      const treeData = this.generateTreeData(routes)
      const treeDataKeys = treeData.map(t => t.path);
      (this.$refs.tree as Tree).setCheckedKeys(treeDataKeys)
      // set checked state of a node not affects its father and child nodes
      this.checkStrictly = false
    })
  }

  private handleDelete({ index, row }: {index: number, row: any}) {
    this.$confirm('Confirm to remove the role?', 'Warning', {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
      .then(async() => {
        await deleteRole(row.key)
        this.rolesList.splice(index, 1)
        this.$message({
          type: 'success',
          message: 'Deleted!'
        })
      })
      .catch(err => { console.error(err) })
  }

  private generateTree(routes: RouteConfig[], basePath = '/', checkedKeys: string[]) {
    const res: RouteConfig[] = []
    for (const route of routes) {
      const routePath = path.resolve(basePath, route.path)
      // recursive child routes
      if (route.children) {
        route.children = this.generateTree(route.children, routePath, checkedKeys)
      }
      if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
        res.push(route)
      }
    }
    return res
  }

  private async confirmRole() {
    const isEdit = this.dialogType === 'edit'
    const checkedKeys = (this.$refs.tree as Tree).getCheckedKeys()

    this.role.routes = this.generateTree(this.serviceRoutes, '/', checkedKeys)

    if (isEdit) {
      await updateRole(this.role.key, this.role)
      for (let index = 0; index < this.rolesList.length; index++) {
        if (this.rolesList[index].key === this.role.key) {
          this.rolesList.splice(index, 1, this.role)
          break
        }
      }
    } else {
      const { data } = await addRole(this.role)
      this.role.key = data.key
      this.rolesList.push(this.role)
    }

    const { description, key, name } = this.role
    this.dialogVisible = false
    this.$notify({
      title: 'Success',
      dangerouslyUseHTMLString: true,
      message: `
          <div>Role Key: ${key}</div>
          <div>Role Nmae: ${name}</div>
          <div>Description: ${description}</div>
        `,
      type: 'success'
    })
  }

  // Reference: src/layout/components/Sidebar/SidebarItem.vue
  private onlyOneShowingChild(children: RouteConfig[] = [], parent: RouteConfig) {
    let onlyOneChild = null
    const showingChildren = children.filter(item => !item.meta || !item.meta.hidden)
    // When there is only one child route, the child route is displayed by default
    if (showingChildren.length === 1) {
      onlyOneChild = showingChildren[0]
      onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
      return onlyOneChild
    }
    // Show parent if there are no child route to display
    if (showingChildren.length === 0) {
      onlyOneChild = { ...parent, path: '' }
      return onlyOneChild
    }
    return false
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
