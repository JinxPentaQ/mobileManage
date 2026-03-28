import type { FieldRule } from 'vant'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state
  }

  const getLoginState = computed(() => currentState.value)

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormRules(formData?: Recordable) {
  const getUsernameFormRule = computed(() => createRule('请输入用户名'))
  const getPasswordFormRule = computed(() => createRule('请输入密码'))
  const getCodeFormRule = computed(() => createRule('请输入谷歌验证码'))

  const getFormRules = computed((): { [k: string]: FieldRule[] } => {
    const usernameFormRule = unref(getUsernameFormRule)
    const passwordFormRule = unref(getPasswordFormRule)
    const codeFormRule = unref(getCodeFormRule)

 
    switch (unref(currentState)) {
      // login form rules
      default:
        return {
          account: usernameFormRule,
          pwd: passwordFormRule,
          code: codeFormRule
        }
    }
  })
  return { getFormRules }
}

function createRule(message: string): FieldRule[] {
  return [
    {
      required: true,
      message,
      trigger: 'onBlur',
    },
  ]
}
