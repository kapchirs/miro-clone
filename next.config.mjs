/** @type {import('next').NextConfig} */
const NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com"
            }
        ]
    }
};

export default NextConfig;