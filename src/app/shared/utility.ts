interface SimpleObject {
  [key: string]: any
}

export class Utility {

  static get(obj: SimpleObject, props: string[] | string, defaultValue: any = undefined ): any {
    if(typeof props === 'string'){
        return obj[props] != undefined ? obj[props] : defaultValue
    }

    for(let i = 0; i < props.length && obj; obj = obj[props[i++]]){}

    return obj != undefined ? obj : defaultValue
  }

  static gather(objects: SimpleObject[], props: string[] | string): any[] {
      return objects.map( obj => this.get(obj, props) )
  }

  static unique<T>(list: Array<T>): Array<T> {
      return Array.from(new Set(list))
  }

  static partiallyEqual<T>(obj: T, partial: Partial<T>): boolean {
      for(let key of Object.keys(partial)){
          const typesEqual = typeof obj[key] === typeof partial[key]
          const bothObjects = typeof obj[key] === 'object'

          if( !typesEqual ||
              !bothObjects && obj[key] !== partial[key] ||
              bothObjects && !this.partiallyEqual(obj[key], partial[key])){
              return false
          }
      }
      return true
  }

  static filter<T>(objects: T[], filter: Partial<T>): T[] {
      return objects.filter( obj => this.partiallyEqual(obj, filter) )
  }
}

