import { AuthenticationResult, ConfidentialClientApplication } from '@azure/msal-node'

export class Login {
  private CCA: ConfidentialClientApplication
  private MSALCONFIG = {
    auth: {
      clientId: '3bc6ec22-b671-4b97-87bf-a4ec7e4ff6df',
      authority: 'https://login.microsoftonline.com/921addfd-baec-4928-a5f5-a740708aa046',
      clientSecret: '7tR8Q~D098QkR6AaENCWng4kuTOW9q1CTaA5acnx'
    }
  }
  constructor() {
    this.CCA = new ConfidentialClientApplication(this.MSALCONFIG)
  }

  async getToken(args: { name: string, password: string }): Promise<AuthenticationResult | null> {
    const res = await this.CCA.acquireTokenByUsernamePassword({
      scopes: ['https://orgf4fa1979.crm5.dynamics.com/.default'],
      username: args.name, // Add your username here
      password: args.password, // Add your password here
    })
    return res
  }
  /**
   * 刷新token
   * @param token 
   * @returns 
   */
  async refreshToken(token: string): Promise<AuthenticationResult | null> {
    const res = await this.CCA.acquireTokenByRefreshToken({
      scopes: ['https://orgf4fa1979.crm5.dynamics.com/.default'],
      refreshToken: token
    })
    return res
  }
}