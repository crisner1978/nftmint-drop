import {createClient, createCurrentUserHook} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

// https://nftmintdrop.sanity.studio/desk

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(config)

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)