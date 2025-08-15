*August 13th*
1. The class Error is often used with for error handling or extended for specific error handling classes, ie AuthError. It comes with name and message.
2. Super is used to pass values back to parent classes' properties/members. 
3. Logging in and registering user from the backend using the credentials tells the browser to always include the credentials even for cross origin requests. Same-origin is to send credentials only for the same origin requests.
4. Use types that are meant to match the backend directly with the results of the fetch calls. ie let somevar = apiResult<SomeObject>. And use response types with Promises that are needed only in the app as a result of bigger functions that uses fetch calls. ie function getSomeData(): Promise<SomeTypeSuccess>
5. falsey values: null, undefined, 0, "", false. 
    Used in code such as: 
    if(!respone.Data || counter)
    ^^ This checks if the response if falsey(null or undefined) or if counter is falsey(0)
6. You can create extended Error classes and check if they are instances of the newly created Error class.