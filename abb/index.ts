interface Comparable<T> {
    compareTo(other: T): number;
}

class ComparableNumber implements Comparable<ComparableNumber> {
    value: number;
    
    constructor(value: number) {
        this.value = value;
    }

    compareTo(other: ComparableNumber): number {
        return this.value - other.value;
    }
}

class ComparableString implements Comparable<ComparableString> {
    value: string;
    
    constructor(value: string) {
        this.value = value;
    }

    compareTo(other: ComparableString): number {
        if (this.value < other.value) return -1;
        if (this.value > other.value) return 1;
        return 0;
    }
}


interface NodoABB<T> {
    valor: T; 
    izquierda: NodoABB<T> | null;
    derecha: NodoABB<T> | null;
}

class NodoABB<T extends Comparable<T>> implements NodoABB<T> {
    valor: T;
    izquierda: NodoABB<T> | null;
    derecha: NodoABB<T> | null;
    constructor(val: T){
        this.valor = val; 
        this.izquierda = null;
        this.derecha = null;
    }
}

class ABB<T extends Comparable<T>> {
    raiz: NodoABB<T> | null;

    constructor(){
        this.raiz = null;
    }

    esta(e: T): boolean {
        const nodo: NodoABB<T> | null = this.raiz;
        if(!nodo) return false;
        return this.estaAux(nodo, e);
    }

    private estaAux(nodo: NodoABB<T> | null, e: T):boolean{
        if(!nodo) return false;
        if(nodo.valor.compareTo(e) === 0) return true;
        if(e.compareTo(nodo.valor)>0) return this.estaAux(nodo.derecha, e);

        return this.estaAux(nodo.izquierda, e);

    }

    cantApariciones(e: T): number{
        const nodo: NodoABB<T> | null = this.raiz;
        let cantAp: number = 0; 
        if(!nodo) return cantAp; 
        if(nodo.valor === e){
            cantAp = this.cantAparicionesAux(nodo.izquierda, e, 1); 
        }else{
            cantAp = this.cantAparicionesAux(nodo, e, 0);
        }

        return cantAp;
    }

    private cantAparicionesAux(nodo: NodoABB<T> | null, e: T, cantAp: number): number{
        if (!nodo) return cantAp;

        if (e.compareTo(nodo.valor) === 0) {
            cantAp += 1;
        }

        cantAp = this.cantAparicionesAux(nodo.izquierda, e, cantAp);
        cantAp = this.cantAparicionesAux(nodo.derecha, e, cantAp);

        return cantAp;
    }

    insertar(e: T){
        const nodo: NodoABB<T> | null = new NodoABB<T>(e);
        let raiz: NodoABB<T> | null = this.raiz;

        if(!raiz){
            this.raiz = nodo; 
            return; 
        }

        this.insertarAux(raiz, nodo);
    }

    private insertarAux(raiz: NodoABB<T>, nodo: NodoABB<T>){
        if(nodo.valor.compareTo(raiz.valor)<=0){
            if(!raiz.izquierda){
                raiz.izquierda = nodo;
            }else{
                this.insertarAux(raiz.izquierda, nodo);
            }
        }else{
            if(!raiz.derecha){
                raiz.derecha = nodo;
            }else{
                this.insertarAux(raiz.derecha, nodo);
            }
        }
    }

}

const abb: ABB<ComparableNumber> = new ABB<ComparableNumber>();
const cien = new ComparableNumber(100);
abb.insertar(cien);
abb.insertar(new ComparableNumber(20));
abb.insertar(new ComparableNumber(100));
abb.insertar(new ComparableNumber(100));
abb.insertar(new ComparableNumber(100));
abb.insertar(new ComparableNumber(100));
abb.insertar(new ComparableNumber(100));
abb.insertar(new ComparableNumber(15));
abb.insertar(new ComparableNumber(150));
abb.insertar(new ComparableNumber(120));

console.log(abb.raiz);

console.log(abb.cantApariciones(new ComparableNumber(15))); // 1
console.log(abb.esta(new ComparableNumber(120)));
