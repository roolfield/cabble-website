/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Calculator($licensePlate: ID!) {\n    vehicleData(licensePlate: $licensePlate) {\n      fuel {\n        type\n        consumptionCombined\n      }\n      fuelPrice {\n        price {\n          currency\n          amount\n        }\n      }\n    }\n  }\n": types.CalculatorDocument,
    "\n  query DriverSharingRequest($driverId: ID!) {\n    userProfile(userId: $driverId) {\n      id\n      profilePicture {\n        url\n        metadata {\n          ... on ImageFileMetadataView {\n            width\n            height\n          }\n        }\n      }\n      firstName\n      lastName\n    }\n  }\n": types.DriverSharingRequestDocument,
    "\n  query OwnerSharingRequest($carId: ID!) {\n    car(carId: $carId) {\n      id\n      name\n      description\n      profilePicture {\n        url\n        metadata {\n          ... on ImageFileMetadataView {\n            width\n            height\n          }\n        }\n      }\n      vehicleData {\n        fuel {\n          type\n        }\n        licensePlate\n        numberOfDoors\n        numberOfSeats\n        firstAdmission\n      }\n      location {\n        description\n      }\n      transmission\n      tripPricing {\n        minimumBillableHours\n        currency\n        distanceAllowance\n        serviceFeePercentage\n        priceList {\n          distancePrice\n          timePrice\n        }\n      }\n      owner {\n        id\n        profilePicture {\n          url\n          metadata {\n            ... on ImageFileMetadataView {\n              width\n              height\n            }\n          }\n        }\n        firstName\n        lastName\n      }\n    }\n  }\n": types.OwnerSharingRequestDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Calculator($licensePlate: ID!) {\n    vehicleData(licensePlate: $licensePlate) {\n      fuel {\n        type\n        consumptionCombined\n      }\n      fuelPrice {\n        price {\n          currency\n          amount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Calculator($licensePlate: ID!) {\n    vehicleData(licensePlate: $licensePlate) {\n      fuel {\n        type\n        consumptionCombined\n      }\n      fuelPrice {\n        price {\n          currency\n          amount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DriverSharingRequest($driverId: ID!) {\n    userProfile(userId: $driverId) {\n      id\n      profilePicture {\n        url\n        metadata {\n          ... on ImageFileMetadataView {\n            width\n            height\n          }\n        }\n      }\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query DriverSharingRequest($driverId: ID!) {\n    userProfile(userId: $driverId) {\n      id\n      profilePicture {\n        url\n        metadata {\n          ... on ImageFileMetadataView {\n            width\n            height\n          }\n        }\n      }\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OwnerSharingRequest($carId: ID!) {\n    car(carId: $carId) {\n      id\n      name\n      description\n      profilePicture {\n        url\n        metadata {\n          ... on ImageFileMetadataView {\n            width\n            height\n          }\n        }\n      }\n      vehicleData {\n        fuel {\n          type\n        }\n        licensePlate\n        numberOfDoors\n        numberOfSeats\n        firstAdmission\n      }\n      location {\n        description\n      }\n      transmission\n      tripPricing {\n        minimumBillableHours\n        currency\n        distanceAllowance\n        serviceFeePercentage\n        priceList {\n          distancePrice\n          timePrice\n        }\n      }\n      owner {\n        id\n        profilePicture {\n          url\n          metadata {\n            ... on ImageFileMetadataView {\n              width\n              height\n            }\n          }\n        }\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query OwnerSharingRequest($carId: ID!) {\n    car(carId: $carId) {\n      id\n      name\n      description\n      profilePicture {\n        url\n        metadata {\n          ... on ImageFileMetadataView {\n            width\n            height\n          }\n        }\n      }\n      vehicleData {\n        fuel {\n          type\n        }\n        licensePlate\n        numberOfDoors\n        numberOfSeats\n        firstAdmission\n      }\n      location {\n        description\n      }\n      transmission\n      tripPricing {\n        minimumBillableHours\n        currency\n        distanceAllowance\n        serviceFeePercentage\n        priceList {\n          distancePrice\n          timePrice\n        }\n      }\n      owner {\n        id\n        profilePicture {\n          url\n          metadata {\n            ... on ImageFileMetadataView {\n              width\n              height\n            }\n          }\n        }\n        firstName\n        lastName\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;