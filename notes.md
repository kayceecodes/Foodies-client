**August 13th**
1. The class Error is often used with for error handling or extended for specific error handling classes, ie AuthError. It comes with name and message.
2. Super is used to pass values back to parent classes' properties/members. 
3. Logging in and registering user from the backend using the credentials tells the browser to always include the credentials even for cross origin requests. Same-origin is to send credentials only for the same origin requests.
4. Use types that are meant to match the backend directly with the results of the fetch calls. ie let somevar = apiResult<SomeObject>. And use response types with Promises that are needed only in the app as a result of bigger functions that uses fetch calls. ie function getSomeData(): Promise<SomeTypeSuccess>
5. falsey values: null, undefined, 0, "", false. 
    Used in code such as: 
    if(!respone.Data || counter)
    ^^ This checks if the response if falsey(null or undefined) or if counter is falsey(0)
6. You can create extended Error classes and check if they are instances of the newly created Error class.
7. APIs can return any response object so when it comes to errors in catch block it will allow any catch type but you may manually throw an error after checking for a response.ok(which is a boolean derived from if the code is 200-299 or not) and then your 'catch' will catch an error of Type Error since it was thrown.

**September 8th**
1. 'use client' - If you don’t add "use client" to the right parent component, Next.js will throw errors all the way down the component tree, saying each child also needs to be a client component to use that client-side feature. 
    *i.e. ReduxStore > RootLayout > someUI*
    A component that needs to be declared a client component is Redux's store provider or another provider that uses state management such as context api. Commonly in other HOCs. These are client side tools. 

**September 12th**
In React, functions are re-created on every render. If you pass an inline function to useEffect and put it in the dependency array, the effect will re-run on every render because the function reference changes each time. To avoid that, you can wrap the function in useCallback, which memoizes the reference and only re-creates it when its dependencies change. This makes it safe to include in the dependency array without causing unnecessary re-runs. However, if you omit dependencies, you risk stale closures where your callback captures outdated state or props.
**October 27th**
Tailwind/Flexbox has flex-grow-0 aka "grow-0" & flex-0. Flex-0 sets flexbasis to 0 cause it's a short hand. You should use grow-0 over flex-0. Grow-0 on an item will leave flex-basis & flexshrink to their defaults (flexbasis 0%, flexshrink 1) so there's no need for w-fit or w-auto on an item's class. 
**Oct 28**
SetErrors are field specific.
SetStatus is general use of the form.