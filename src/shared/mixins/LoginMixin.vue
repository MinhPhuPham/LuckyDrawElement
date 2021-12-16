<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  OAuthCredential,
  signInWithEmailAndPassword,
  Auth,
} from 'firebase/auth'
@Options({
  components: {},
})
export default class LoginMixin extends Vue {
  loginForm = {
    email: '',
    password: '',
  }

  auth: Auth | undefined

  submitForm() {
    this.setAuth()

    // eslint-disable-next-line
    ;(this.$refs.loginFormRef as any).validate().then(() => {
      signInWithEmailAndPassword(this.auth as Auth, this.loginForm.email, this.loginForm.password)
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.warn('Sign in Email/Pass Err', error)
        })
    })
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

    this.setAuth()

    signInWithPopup(this.auth as Auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result) as OAuthCredential
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  setAuth() {
    if (!this.auth) {
      this.auth = getAuth()
      this.auth.useDeviceLanguage()
    }
  }

  loginWithFacebook() {}
}
</script>
