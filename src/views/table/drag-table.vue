<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="ID"
        width="65"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="Date"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="300px"
        label="Title"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="Author"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="105px"
        label="Importance"
      >
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            name="star"
            class="icon-star"
          />
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Readings"
        width="95"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="Drag"
        width="80"
      >
        <template slot-scope="{}">
          <svg-icon
            class="drag-handler"
            name="drag"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    <div class="show-d">
      <el-tag style="margin-right:12px;">
        {{ $t('table.dragTips1') }} :
      </el-tag> {{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>{{ $t('table.dragTips2') }} :</el-tag> {{ newList }}
    </div>
  </div>
</template>

<script lang="ts">
import Sortable from 'sortablejs'
import { Component, Vue } from 'vue-property-decorator'
import { fetchList } from '@/api/article'
import * as filters from '@/filters'

@Component({
  filters: {
    statusFilter: (status: string) => {
      const statusMap: { [id: string]: string } = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    parseTime: filters.parseTime
  }
})
export default class DragTable extends Vue {
  private list: any[] = []
  private listLoading = true
  private total = []
  private oldList: any[] = []
  private newList: any[] = []
  private listQuery = {
    page: 1,
    limit: 10
  }
  private sortable: Sortable | null = null

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await fetchList(this.listQuery)
    this.list = data.items
    this.listLoading = false
    this.total = data.total
    this.oldList = this.list.map((v: any) => v.id)
    this.newList = this.oldList.slice()
    this.$nextTick(() => {
      this.setSort()
    })
  }

  private setSort() {
    const el = (this.$refs.dragTable as Vue).$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0] as HTMLElement
    this.sortable = Sortable.create(el, {
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
      setData: (dataTransfer) => {
        // to avoid Firefox bug
        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        dataTransfer.setData('Text', '')
      },
      onEnd: evt => {
        if (typeof (evt.oldIndex) !== 'undefined' && typeof (evt.newIndex) !== 'undefined') {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      }
    })
  }
}
</script>

<style lang="scss">
.sortable-ghost {
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style lang="scss" scoped>
.icon-star {
  margin-right:2px;
}

.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}
</style>
