function create<T>(c:{new():T}):T{
    return new c()
}

type User = {
    a:string
}
function PiTer(a:string) {
    this.a = a
 }
