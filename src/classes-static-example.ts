/* eslint-disable */

class A {
  static username = 'Hello, Kaja'

  age = 5
}

class B extends A {
  static anotherTest() {
    console.log(B.username)
  }

  testMe() {
    console.log(this.age)
  }
  age = 10
}

type AType = typeof A
let foo: AType
const bar = new foo().age

// this means that value of TC type can be called with "new" and returns M
// M type can be restricted (returns a type)
// TC type is not "modelled" again
interface BaseModelCtor<M extends A> {
  new (...args: any[]): M
}

// class C<T extends A, TC extends BaseModelCtor<T> = any> {
class C<T extends A, TC extends typeof A> {
  static cStaticTest(model: any) {
    console.log('Model is with type=any: ', model.username)
  }

  cTest(model: T) {
    console.log('From C: ', model.age)
  }

  cTestClass(model: TC) {
    const tInstance = new model()
    console.log(tInstance.age)
  }

  cTestStatic(model: TC) {
    console.log('pass class: ', model.username)
  }
}

class D {}
// ------- TESTS ------------------------
const aInstance = new A()
console.log(B.username, 'this is from A')
const bInstance = new B()
console.log(bInstance.age)

C.cStaticTest(A)
const cInstance = new C()
// passing instances
cInstance.cTest(aInstance)
cInstance.cTest(bInstance)
// passing A as class type
cInstance.cTestClass(A)
console.log('Passing B as Class type?')
cInstance.cTestClass(B)
cInstance.cTestStatic(B)

// const dInstance = new D();
// fails - not of type A
// cInstance.cTest(dInstance);
