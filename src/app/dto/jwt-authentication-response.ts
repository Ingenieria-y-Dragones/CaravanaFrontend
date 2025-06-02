export class JwtAuthenticationResponse {
  constructor(public token: string, public correo: string, public rol: string) { }
}
