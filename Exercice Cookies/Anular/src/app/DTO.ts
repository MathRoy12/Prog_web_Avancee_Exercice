export class RegisterDTO{
  public password:string
  public passwordConfirm:string
  public userName:string
  public email:string
  constructor() {
    this.password = "Passw0rd!"
    this.passwordConfirm = "Passw0rd!"
    this.userName = "Moi"
    this.email = "moi@test.org"
  }
}

export class LoginDTO{
  public userName:string
  public password:string

  constructor() {
    this.userName = "Moi"
    this.password = "Passw0rd!"
  }
}
