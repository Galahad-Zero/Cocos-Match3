export function HasLocalData(name:string):boolean{
    const str = cc.sys.localStorage.getItem(name);
    return str !== '[object Object]';
}

export function getLocalData<T>(name:string):T{
    const str = cc.sys.localStorage.getItem(name);
    return JSON.parse(str);
}

export function setLocalData(name:string, obj: Object):void{
    cc.sys.localStorage.setItem(name, JSON.stringify(obj));
}