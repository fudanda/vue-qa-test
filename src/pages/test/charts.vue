<template>
<q-page padding>

  <q-card>
    <q-card-title>

      <q-option-group inline @input="changeType" v-model="tab" :options="chartOption" />
    
    </q-card-title>
    <q-card-main>
      <ve-chart :settings="chartSettings" :data="chartData"></ve-chart>
    </q-card-main>

  </q-card>

  <q-card class="q-mt-sm">
    <q-card-title>
      地图
    </q-card-title>
    <q-card-main>
      <ve-map :data="mapData"></ve-map>
    </q-card-main>

  </q-card>


</q-page>
</template>

<script>
export default {
  data() {
    return {
      types: [{
          type: 'line'
        },
        {
          type: 'histogram'
        },
        {
          type: 'pie'
        }
      ],
      chartOption: [{
          label: '折线',
          value: 'line'
        },
        {
          label: '柱状',
          value: 'histogram'
        },
        {
          label: '饼图',
          value: 'pie'
        },
        {
          label: 'ring',
          value: 'ring'
        },
        {
          label: 'waterfall',
          value: 'waterfall'
        },
        {
          label: 'funnel',
          value: 'funnel'
        },
        {
          label: 'map',
          value: 'map'
        },
        {
          label: 'sankey',
          value: 'sankey'
        },
        {
          label: 'radar',
          value: 'radar'
        },
        {
          label: 'heatmap',
          value: 'heatmap'
        },
        {
          label: 'scatter',
          value: 'scatter'
        },
        {
          label: 'candle',
          value: 'candle'
        },
        {
          label: 'gauge',
          value: 'gauge'
        },
        {
          label: 'tree',
          value: 'tree'
        }
      ],
      chartData: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [{
            '日期': '2018-05-22',
            '访问用户': 32371,
            '下单用户': 19810
          },
          {
            '日期': '2018-05-23',
            '访问用户': 12328,
            '下单用户': 4398
          },
          {
            '日期': '2018-05-24',
            '访问用户': 92381,
            '下单用户': 52910
          }
        ]
      },
      mapData: {
        columns: ['位置', '税收', '人口', '面积'],
        rows: [{
            '位置': '吉林',
            '税收': 123,
            '人口': 123,
            '面积': 92134
          },
          {
            '位置': '北京',
            '税收': 1223,
            '人口': 2123,
            '面积': 29234
          },
          {
            '位置': '上海',
            '税收': 2123,
            '人口': 1243,
            '面积': 94234
          },
          {
            '位置': '浙江',
            '税收': 4123,
            '人口': 5123,
            '面积': 29234
          }
        ]
      },
      chartSettings: {
        type: 'line',
      },
      tab: 'line',
    }

  },
  methods: {
    changeType: function() {
      this.chartSettings.type = this.tab
      console.log(this.tab)

    }
  }
}
</script>