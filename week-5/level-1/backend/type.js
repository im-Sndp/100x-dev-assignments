const zod = require("zod");

const signUp = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string(),
    description: zod.string(),
    interest: zod.array(zod.string())
})

const signIn = zod.object({
    email: zod.string(),
    password: zod.string()
})

const update = zod.object({
    description: zod.string(),
    interest: zod.array(zod.string())
})

module.exports = {
    signUp,
    signIn,
    update
}