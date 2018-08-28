<template>
<q-page padding class="docs-table">

    <q-table :data="tableData" :filter="filter" :visible-columns="visibleColumns" :separator="separator" :columns="columns" :selection="selection" :selected.sync="selected" :loading="loading" row-key="id" color="secondary">


        <template slot="top-left" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="filter"
          class="col-6"
        />
        <q-btn icon="delete" flat @click="deleteRow"></q-btn>
        <q-btn icon="add" flat @click="addRow"></q-btn>
</template>
<template slot="top-right" slot-scope="props">
<q-table-columns color="secondary" class="q-mr-sm" v-model="visibleColumns" :columns="columns" />
<q-select color="secondary" v-model="separator" :options="[
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
            { label: 'Cell', value: 'cell' },
            { label: 'None', value: 'none' }
          ]" hide-underline />
<q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" />
</template>
      
 <!-- <q-tr slot="header" slot-scope="props">
        <q-th auto-width>
          <q-checkbox
            v-if="props.multipleSelect"
            v-model="props.selected"
            indeterminate-value="some"
          />
        </q-th>
        <q-th v-for="col in props.cols" :key="col.id" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr> -->

<!--<template slot="body" slot-scope="props">
<q-tr :props="props">
    <q-td auto-width>
        <q-checkbox :val="props.row.id" color="primary" v-model="props.selected" />
    </q-td>
    <q-td key="id" :props="props">
        <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" /> {{ props.row.id }}
    </q-td>
    <q-td key="title" :props="props">{{ props.row.title }}</q-td>
    <q-td key="year" :props="props">{{ props.row.year }}
        <q-tooltip>
            <q-card inline class="q-ma-sm col-2">
                <q-card-media>
                    <img style="width: 150px" :src="props.row.images.medium">
                </q-card-media>
            </q-card>
        </q-tooltip>
    </q-td>

</q-tr>
</template>-->


    </q-table>



  </q-page>
</template>

<script>
export default {
    data() {
        return {
            columns: [],
            tableData: [],
            data:{},
            filter: '',
            visibleColumns: [],
            separator: 'horizontal',
            selection: 'multiple',
            selected: [],
            selectedId: [],
            pagination: {
                page: 2
            },
            paginationControl: {
                rowsPerPage: 3,
                page: 1
            },
            loading: true,
            dark: true,
            selectedSecond: [{
                name: 'Eclair'
            }]
        }
    },
    watch: {

    },
    computed: {
        tableClass() {
            if (this.dark) {
                return 'bg-black'
            }
        }
    },
    mounted() {
        // this.getData()
        this.test()
    },
    methods: {
        // getData() {
        //     var self = this
        //     this.$axios.get('/api/movie/top250?start=25&count=25')
        //         .then(function(res) {
        //             console.log(res.data.subjects)
        //             self.tableData = res.data.subjects
        //             // console.log(self.tableData)
        //             var std = self.tableData[0];
        //             for (var key in std) {
        //                 self.visibleColumns.push(key);
        //             }
        //             console.log(self.tableData.length);
        //             self.visibleColumns = self.visibleColumns.reverse()
        //             for (let i = 0; i < self.visibleColumns.length; i++) {
        //                 var arr = {
        //                     name: self.visibleColumns[i],
        //                     label: self.visibleColumns[i],
        //                     field: self.visibleColumns[i],
        //                     align: 'center',
        //                     sortable: true
        //                 }
        //                 self.columns.push(arr);
        //             }
        //             console.log(self.columns);
        //             self.loading = false;
        //         })
        //         .catch(function(error) {

        //         })
        // },

        deleteRow() {
            this.selectedId = [];
            var name = '';
            this.selected.forEach(e => {
                this.selectedId.push(e.id)
            });
            console.log(this.selectedId);
            this.$q.notify({
                color: 'secondary',
                icon: 'delete',
                message: `Will delete the selected ` + this.selectedId
            })
        },
        test() {
            var self = this
            const data = self.data
            this.$api.getagroup().then(res => {
                console.log(res)
                 self.tableData = res
                    var std = self.tableData[0];
                    for (var key in std) {
                        self.visibleColumns.push(key);
                    }
                    console.log(self.tableData.length);
                    // self.visibleColumns = self.visibleColumns.reverse()//排序
                    for (let i = 0; i < self.visibleColumns.length; i++) {
                        var arr = {
                            name: self.visibleColumns[i],
                            label: self.visibleColumns[i],
                            field: self.visibleColumns[i],
                            align: 'center',
                            sortable: true
                        }
                        self.columns.push(arr);
                    }
                    console.log(self.columns);
                    self.loading = false;
            })
        },
        addRow() {
            this.selectedId = [];
            var name = '';
            this.selected.forEach(e => {
                this.selectedId.push(e._id)
            });
            console.log(this.selectedId);
            this.$q.notify({
                color: 'secondary',
                icon: 'delete',
                message: `Will delete the selected ` + this.selectedId
            })
        },
        rowClick(row) {
            this.$q.notify({
                color: 'primary',
                icon: 'local_dining',
                message: `Hmm, are you sure? It has ${row.calories} calories.`,
                actions: [{
                    label: 'Yes, eat!',
                    handler: () => {
                        this.$q.notify({
                            color: 'positive',
                            icon: 'done',
                            message: 'Yummy. Thanks! Now one more.'
                        })
                    }
                }]
            })
        }
    }
}
</script>









