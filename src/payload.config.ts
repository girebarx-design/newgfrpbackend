// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HomePage } from './globals/Home'
import { ProductSection } from './collections/Product'

import { ResourcesSection } from './collections/ResourcesSection'

import { Contact } from './collections/Contact'
import { ContactSubmissions } from './collections/ContactSubmissions'

import { FooterComponent } from './collections/Footer'

import { FAQ } from './collections/faq'

import { About } from './collections/About'


import { Blogs, BlogSection } from './collections/Blogs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    ProductSection,
    ResourcesSection,
    Blogs,
    BlogSection,
    Contact,
    ContactSubmissions,
    FAQ,
    FooterComponent,
    About,
  ],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  cors: [
    'http://localhost:3000',
    'https://newgfrpfrontend.vercel.app',
    'https://www.gfrpindia.com',
  ],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
