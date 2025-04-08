# cupNote
it's a website where users create account and add their recipes (title, ingredients, content, rating 1-5)
name comes from cupcakes + note.

to run this web I needed some packages: 
bcryptjs -- for encoding and decoding the password
cookie-parser -- reading cookie that token got inside
ejs -- view engine, like html
express --works with router
express-validator  --validation
jsonwebtoken --creates token
nodemon  --ontime rendering
sqlite3 -- database

their versions are on package.json

but I dont have controllers, because it's kinda mixed with it in my mind.

insdead: I have routes that got api and web, api that works between client side and bussness logic. and web stand for rendering client side.

all other things are as mentioned on cw.