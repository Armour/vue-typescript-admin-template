<template>
  <el-table
    :data="list"
    style="width: 100%;padding-top: 15px;"
  >
    <el-table-column
      label="Order_No"
      min-width="200"
    >
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column
      label="Price"
      width="195"
      align="center"
    >
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column
      label="Status"
      width="100"
      align="center"
    >
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { transactionList } from '@/api/remote-search'

@Component({
  filters: {
    statusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter: (str: string) => str.substring(0, 30),
    // Input 10000 => Output "10,000"
    toThousandFilter: (num: number) => {
      return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
  }
})
export default class TransactionTable extends Vue {
  private list: any[] = []

  created() {
    this.fetchData()
  }

  private fetchData() {
    transactionList({}).then(response => {
      this.list = response.data.items.slice(0, 8)
    })
  }
}
</script>
