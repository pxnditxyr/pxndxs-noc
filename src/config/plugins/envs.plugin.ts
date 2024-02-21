class ConfigEnvironment {

  constructor(
    private readonly value : string,
    private readonly type : string = 'string'
  ) {}

  static get( key : string ) : ConfigEnvironment {
    const value = process.env[ key ]
    if ( value === undefined ) throw new Error( `Environment variable ${ key } is not defined ❌` )
    return new ConfigEnvironment( value )
  }


  isRequired () : ConfigEnvironment {
    if ( this.value.trim() === '' ) throw new Error( `The value of the environment variable is required ❌` )
    return this;
  }

  isString () : ConfigEnvironment {
    if ( typeof this.value !== 'string' ) throw new Error( `The value of the environment variable must be a string, but received ${ typeof this.value } ⚠️` )
    return this
  }

  isNumber () : ConfigEnvironment {
    if ( isNaN( Number( this.value ) ) ) throw new Error( `The value of the environment variable must be a number, but received ${ typeof this.value } ⚠️` )
    return this
  }

  isBool () : ConfigEnvironment {
    if ( this.value !== 'true' && this.value !== 'false' ) throw new Error( `The value of the environment variable must be a boolean, but received ${ typeof this.value } ⚠️` )
    return this
  }

  isPort () : ConfigEnvironment {
    if ( isNaN( Number( this.value ) ) || Number( this.value ) < 0 || Number( this.value ) > 65535 ) throw new Error( `The value of the environment variable must be a port, but received ${ this.value } ⚠️` )
    return this
  }

  asString (): string {
    return String( this.value )
  }

  asNumber (): number {
    return Number( this.value )
  }

  asBool (): boolean {
    return this.value === 'true'
  }
    
  getValue (): string {
    return this.value;
  }
}

export const envs = {
  PORT: ConfigEnvironment.get( 'PORT' ).isRequired().isPort().asNumber(),
  MAILER_EMAIL: ConfigEnvironment.get( 'MAILER_EMAIL' ).isRequired().asString(),
  MAILER_SECRET_KEY: ConfigEnvironment.get( 'MAILER_SECRET_KEY' ).isRequired().asString(),
  MAILER_SERVICE: ConfigEnvironment.get( 'MAILER_SERVICE' ).isRequired().asString(),
  PROD: ConfigEnvironment.get( 'PROD' ).isRequired().isBool().asBool(),
}
