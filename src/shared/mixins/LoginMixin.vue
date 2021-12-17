<script lang="ts">
import { h } from 'vue'
import { Vue, Options } from 'vue-class-component'
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  OAuthCredential,
  signInWithEmailAndPassword,
  Auth,
  User,
  AuthProvider,
} from 'firebase/auth'
import { FrownOutlined } from '@ant-design/icons-vue'

@Options({
  components: {},
})
export default class LoginMixin extends Vue {
  loginForm = {
    email: '',
    password: '',
  }

  auth: Auth | undefined

  get formRef() {
    // eslint-disable-next-line
    return this.$refs.loginFormRef as any
  }

  submitForm() {
    this.setAuth()

    this.formRef.validate().then(() => {
      signInWithEmailAndPassword(this.auth as Auth, this.loginForm.email, this.loginForm.password)
        .then((result) => {
          this.loginSuccessful(result.user)
        })
        .catch((error) => {
          this.notifyError(error, 'Sign in')
        })
    })
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

    this.setAuth()
    this.socialLoginMethod(provider)
  }

  socialLoginMethod(provider: AuthProvider, isGoogle = true) {
    signInWithPopup(this.auth as Auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result) as OAuthCredential
        const token = credential.accessToken
        // The signed-in user info.
        this.loginSuccessful(result.user)
      })
      .catch((error) => {
        this.notifyError(error, isGoogle ? 'Google Login' : 'Facebook Login')
      })
  }

  setAuth() {
    if (!this.auth) {
      this.auth = getAuth()
      this.auth.useDeviceLanguage()
    }
  }

  // eslint-disable-next-line
  notifyError(error: any, title: string) {
    this.$notification.open({
      message: error.code + ' ' + title,
      description: error.errorMessage,
      icon: h(FrownOutlined, { style: 'color: red' }),
    })
  }

  loginSuccessful(user: User) {
    // override on parent mixin
  }

  loginWithFacebook() {
    const provider = new FacebookAuthProvider()
    this.socialLoginMethod(provider, false)
  }
}
</script>
