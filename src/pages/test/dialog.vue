<template>
  <q-page padding >

      <q-btn color="primary" @click="customDialogModel = true" label="Show Dialog" />
      <q-btn icon="create" label="New item" />  
      <q-dialog
        v-model="customDialogModel"
        stack-buttons
        prevent-close
        @cancel="onCancel"
        @ok="onOk"
        @show="onShow"
        @hide="onHide"
      >
        <!-- This or use "title" prop on <q-dialog> -->
        <span slot="title">Add News</span>


        <div slot="body">
          <q-field
            icon="account_circle"
            helper="We need your name so we can send you to the movies."
            label="Your name"
            :label-width="3"
            :error="nameError"
          >
            <q-input v-model="name" />
          </q-field>
        </div>

        <template slot="buttons" slot-scope="props">
          <q-btn flat label="No thanks" @click="props.cancel" />
        </template>
      </q-dialog>
 
  </q-page>
</template>

<script>
export default {
  methods: {
    openSpecialPosition (position) {
      this.$q.dialog({
        title: 'Positioned',
        message: `This dialog appears from ${position}.`,
        position
      })
    },
    onOk () {
      console.log('ok')
    },
    onCancel () {
      console.log('cancel')
    },
    onShow () {
      console.log('show')
    },
    onHide () {
      console.log('hide')
    },
    async choose (okFn, hero) {
      if (this.name.length === 0) {
        this.error = true
        this.$q.dialog({
          title: 'Please specify your name!',
          message: `Can't buy tickets without knowing your name.`
        })
      }
      else {
        await okFn()
        this.$q.notify(`Ok ${this.name}, going with ${hero}`)
      }
    }
  },
  watch: {
    name (val) {
      const err = val.length === 0
      if (this.nameError !== err) {
        this.nameError = err
      }
    }
  },
  data () {
    return {
      customDialogModel: false,
      name: '',
      nameError: false,
      positionalIcon: {
        top: 'arrow_upward',
        right: 'arrow_forward',
        bottom: 'arrow_downward',
        left: 'arrow_back'
      },
      types: [
        {
          label: 'Alert',
          icon: 'warning',
          handler: () => {
            this.$q.dialog({
              title: 'Alert',
              message: 'Modern HTML5 front-end framework on steroids.'
            })
          }
        },
        {
          label: 'Confirm',
          icon: 'done_all',
          handler: () => {
            this.$q.dialog({
              title: 'Confirm',
              message: 'Modern HTML5 front-end framework on steroids.',
              ok: 'Agree',
              cancel: 'Disagree'
            }).then(() => {
              this.$q.notify('Agreed!')
            }).catch(() => {
              this.$q.notify('Disagreed...')
            })
          }
        },
        {
          label: 'Prompt',
          icon: 'help',
          handler: () => {
            this.$q.dialog({
              title: 'Prompt',
              message: 'Modern front-end framework on steroids.',
              prompt: {
                model: '',
                type: 'text' // optional
              },
              cancel: true,
              color: 'secondary'
            }).then(data => {
              this.$q.notify(`You typed: "${data}"`)
            }).catch(() => {
              this.$q.notify('Ok, no mood for talking, right?')
            })
          }
        },
        {
          label: 'Single Choice Selection',
          icon: 'radio_button_checked',
          handler: () => {
            this.$q.dialog({
              title: 'Options',
              message: 'Modern front-end framework on steroids.',
              options: {
                type: 'radio',
                model: 'opt2',
                items: [
                  {label: 'Option 1', value: 'opt1', color: 'secondary'},
                  {label: 'Option 2', value: 'opt2'},
                  {label: 'Option 3', value: 'opt3'}
                ]
              },
              cancel: true,
              preventClose: true,
              color: 'secondary'
            }).then(data => {
              this.$q.notify(`You selected: ${data}`)
            })
          }
        },
        {
          label: 'Multiple Choice Selection',
          icon: 'check_box',
          handler: () => {
            this.$q.dialog({
              title: 'Options',
              message: 'Modern front-end framework on steroids.',
              options: {
                type: 'checkbox',
                model: [],
                items: [
                  {label: 'Option 1', value: 'opt1', color: 'secondary'},
                  {label: 'Option 2', value: 'opt2'},
                  {label: 'Option 3', value: 'opt3'}
                ]
              },
              cancel: true,
              preventClose: true,
              color: 'secondary'
            }).then(data => {
              this.$q.notify(`You selected: ${JSON.stringify(data)}`)
            })
          }
        }
      ],
      options: [
        {
          label: 'Stacked Buttons',
          icon: 'dns',
          handler: () => {
            this.$q.dialog({
              title: 'Stacked buttons',
              message: 'Go to a movie.',
              ok: 'Yes, please!',
              cancel: 'Uhm, nope',
              stackButtons: true
            }).then(() => {
              this.$q.notify('Agreed!')
            }).catch(() => {
              this.$q.notify('Disagreed...')
            })
          }
        },
        {
          label: 'Prevent accidental close',
          icon: 'power_settings_new',
          handler: () => {
            this.$q.dialog({
              title: 'Prevent close',
              message: 'This dialog cannot be dismissed by clicking/tapping on the background overlay.',
              ok: true,
              cancel: true,
              preventClose: true
            }).then(() => {
              this.$q.notify('You said OK!')
            }).catch(() => {
              this.$q.notify(`You didn't agree`)
            })
          }
        }
      ]
    }
  }
}
</script>