To flow kuchh aisa hai ki aj jo bhi kiya hai wo line se likh diya mene

1. simply database connect kiya 

2. models folder -> user schema (jo bhi tha code likh diya)

3. src->routes->auth.routes.js
    jab app.js ke alawa kahi aur api create karni ho to ham express.Router() ka use karte hai. Bat khatm

    aur fir app.js me app.use kar liya prefix ke sath

4.  userSchema me email ko unique kiya, par usse internal error ata hai jo nahi ana chahiye mtlb no good to show . to handle karna padega
so we use -> findOne method

5. Token=>id card (but has no value without headmaster signature)
so we sign the token with JWT_SECRET 

bas yaha par token create kiya 

6. ab token ko kahi store karna tha, wese to bahut storage thi but sirf cookie ka hi direct access apne server ke pass hota h , isliye cookie ke zariye save kar diya token




