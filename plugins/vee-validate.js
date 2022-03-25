import Vue from 'vue'
import { extend, ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required, email, max } from 'vee-validate/dist/rules'
import ja from '@/lang/vee-validate/ja.ts'

extend('required', required)
extend('email', email)
extend('max', max)

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

localize('ja', ja)
