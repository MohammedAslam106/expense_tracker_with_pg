/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        PRIVATE_KEY:process.env.PRIVATE_KEY
    },
    images:{
        domains:[
            'lh3.googleusercontent.com',
            'avatars.githubusercontent.com',
            'ui-avatars.com',
            'utfs.io'
        ]
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://upload-documents.vercel.app" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
}

module.exports = nextConfig
