/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
};

export type AddressView = {
  __typename?: 'AddressView';
  city: Scalars['String']['output'];
  line1: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
};

export type CarView = {
  __typename?: 'CarView';
  description?: Maybe<Scalars['String']['output']>;
  drivers: Array<UserProfileView>;
  id: Scalars['ID']['output'];
  licensePlate?: Maybe<Scalars['String']['output']>;
  location?: Maybe<GeocodedLocationView>;
  name: Scalars['String']['output'];
  owner: UserProfileView;
  profilePicture?: Maybe<ImageFileView>;
  requiresApproval: Scalars['Boolean']['output'];
  timezone: Scalars['String']['output'];
  transmission?: Maybe<Scalars['String']['output']>;
  tripPricing?: Maybe<TimeDistancePricingView>;
  vehicleData?: Maybe<VehicleDataView>;
};

export type ChatMessagePaginationResult = {
  __typename?: 'ChatMessagePaginationResult';
  items: Array<ChatMessageView>;
  pageInfo: PageInfo;
};

export type ChatMessageView = {
  __typename?: 'ChatMessageView';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  member: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type ChatPaginationResult = {
  __typename?: 'ChatPaginationResult';
  items: Array<ChatView>;
  pageInfo: PageInfo;
};

export type ChatView = {
  __typename?: 'ChatView';
  id: Scalars['String']['output'];
  members: Array<UserProfileView>;
  messages: ChatMessagePaginationResult;
};


export type ChatViewMessagesArgs = {
  paginationParams?: InputMaybe<PaginationParams>;
};

export type CombinedTripDetailsView = {
  __typename?: 'CombinedTripDetailsView';
  endedAt?: Maybe<Scalars['String']['output']>;
  fuelConsumption?: Maybe<FuelConsumptionView>;
  odometer: OdometerReadingView;
  startedAt: Scalars['String']['output'];
};

export type DistanceView = {
  __typename?: 'DistanceView';
  unit: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type FuelConsumptionView = {
  __typename?: 'FuelConsumptionView';
  consumption: Scalars['Float']['output'];
  price: MoneyView;
  type: Scalars['String']['output'];
};

export type FuelPriceView = {
  __typename?: 'FuelPriceView';
  costs: MoneyView;
  price: MoneyView;
};

export type FuelView = {
  __typename?: 'FuelView';
  consumptionCombined?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type GeocodedLocationView = {
  __typename?: 'GeocodedLocationView';
  coordinates: PointView;
  description: Scalars['String']['output'];
};

export type HistoricalFuelPriceView = {
  __typename?: 'HistoricalFuelPriceView';
  price: MoneyView;
};

export type ImageFileMetadataView = {
  __typename?: 'ImageFileMetadataView';
  height: Scalars['Float']['output'];
  mimeType: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  size: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
};

export type ImageFileView = {
  __typename?: 'ImageFileView';
  id: Scalars['ID']['output'];
  metadata?: Maybe<ImageFileMetadataView>;
  url?: Maybe<Scalars['String']['output']>;
};

export type MoneyView = {
  __typename?: 'MoneyView';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
};

export type OdometerReadingView = {
  __typename?: 'OdometerReadingView';
  end?: Maybe<DistanceView>;
  endPicture?: Maybe<ImageFileView>;
  start: DistanceView;
  startPicture?: Maybe<ImageFileView>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count: Scalars['Float']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  offset: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
};

export type PaginationParams = {
  offset?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
};

export type PairingCodeView = {
  __typename?: 'PairingCodeView';
  car?: Maybe<CarView>;
  code: Scalars['String']['output'];
  driver?: Maybe<UserProfileView>;
  expired: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  redeemed: Scalars['Boolean']['output'];
};

export type PaymentIntentionView = {
  __typename?: 'PaymentIntentionView';
  amountCaptured: Scalars['Float']['output'];
  amountRequested: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  customerId: Scalars['String']['output'];
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  paymentProcessorDetails?: Maybe<StripePaymentIntentionPaymentProcessorDetailsView>;
  status: Scalars['String']['output'];
};

export type PayoutAccountView = {
  __typename?: 'PayoutAccountView';
  bankAccount?: Maybe<Scalars['String']['output']>;
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  paymentProcessorDetails?: Maybe<StripePayoutAccountPaymentProcessorDetailsView>;
  status: Scalars['String']['output'];
};

export type PlannedTripExtensionView = {
  __typename?: 'PlannedTripExtensionView';
  approvalStatus: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

export type PlannedTripView = {
  __typename?: 'PlannedTripView';
  approvalStatus?: Maybe<Scalars['String']['output']>;
  canceledAt?: Maybe<Scalars['String']['output']>;
  canceledNote?: Maybe<Scalars['String']['output']>;
  car: CarView;
  denialNote?: Maybe<Scalars['String']['output']>;
  driver: UserProfileView;
  extension?: Maybe<PlannedTripExtensionView>;
  from: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  to: Scalars['String']['output'];
  trip?: Maybe<TripView>;
};

export type PointView = {
  __typename?: 'PointView';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type PriceViewBreakdownItem = {
  __typename?: 'PriceViewBreakdownItem';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: MoneyView;
  type?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  car?: Maybe<CarView>;
  chat?: Maybe<ChatView>;
  chats: ChatPaginationResult;
  pairingCode?: Maybe<PairingCodeView>;
  payoutAccount?: Maybe<PayoutAccountView>;
  plannedTrip?: Maybe<PlannedTripView>;
  plannedTrips: TripPaginationResult;
  user?: Maybe<UserView>;
  userProfile?: Maybe<UserProfileView>;
  userProfiles: Array<UserProfileView>;
  vehicleData?: Maybe<VehicleDataView>;
};


export type QueryCarArgs = {
  carId: Scalars['ID']['input'];
};


export type QueryChatArgs = {
  chatId: Scalars['ID']['input'];
};


export type QueryChatsArgs = {
  paginationParams?: InputMaybe<PaginationParams>;
  userId: Scalars['String']['input'];
};


export type QueryPairingCodeArgs = {
  pairingCode?: InputMaybe<Scalars['String']['input']>;
  pairingCodeId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPayoutAccountArgs = {
  payoutAccountId: Scalars['ID']['input'];
};


export type QueryPlannedTripArgs = {
  carId: Scalars['ID']['input'];
  plannedTripId: Scalars['ID']['input'];
};


export type QueryPlannedTripsArgs = {
  carId: Scalars['ID']['input'];
  dateFrom?: InputMaybe<Scalars['String']['input']>;
  dateTo?: InputMaybe<Scalars['String']['input']>;
  paginationParams?: InputMaybe<PaginationParams>;
  preset?: InputMaybe<TripFilterPreset>;
};


export type QueryUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserProfileArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserProfilesArgs = {
  userIds: Array<Scalars['ID']['input']>;
};


export type QueryVehicleDataArgs = {
  licensePlate: Scalars['ID']['input'];
};

export type ReceiptItemView = {
  __typename?: 'ReceiptItemView';
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
};

export type ReceiptView = {
  __typename?: 'ReceiptView';
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<ReceiptItemView>;
  total: Scalars['Float']['output'];
};

export type StripePaymentIntentionPaymentProcessorDetailsView = {
  __typename?: 'StripePaymentIntentionPaymentProcessorDetailsView';
  cancellationReason?: Maybe<Scalars['String']['output']>;
  declineCode?: Maybe<Scalars['String']['output']>;
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
};

export type StripePayoutAccountErrorView = {
  __typename?: 'StripePayoutAccountErrorView';
  description: Scalars['String']['output'];
  errorCode: Scalars['String']['output'];
};

export type StripePayoutAccountPaymentProcessorDetailsView = {
  __typename?: 'StripePayoutAccountPaymentProcessorDetailsView';
  acceptedTos: Scalars['Boolean']['output'];
  errors?: Maybe<Array<StripePayoutAccountErrorView>>;
  requirementsDue?: Maybe<Array<Scalars['String']['output']>>;
};

export type TimeDistancePriceList = {
  __typename?: 'TimeDistancePriceList';
  distancePrice: Scalars['Float']['output'];
  timePrice: Scalars['Float']['output'];
};

export type TimeDistancePricingPriceView = {
  __typename?: 'TimeDistancePricingPriceView';
  breakdown: Array<PriceViewBreakdownItem>;
  total: MoneyView;
};

export type TimeDistancePricingView = {
  __typename?: 'TimeDistancePricingView';
  currency: Scalars['String']['output'];
  distanceAllowance?: Maybe<Scalars['Float']['output']>;
  fuelPrice?: Maybe<FuelPriceView>;
  id: Scalars['ID']['output'];
  minimumBillableHours: Scalars['Float']['output'];
  price?: Maybe<TimeDistancePricingPriceView>;
  priceList: TimeDistancePriceList;
  serviceFeePercentage: Scalars['Float']['output'];
};


export type TimeDistancePricingViewFuelPriceArgs = {
  carId: Scalars['ID']['input'];
  distance: Scalars['Float']['input'];
};


export type TimeDistancePricingViewPriceArgs = {
  carId: Scalars['ID']['input'];
  fromDate: Scalars['String']['input'];
  toDate: Scalars['String']['input'];
};

export enum TripFilterPreset {
  Timeline = 'Timeline'
}

export type TripPaginationResult = {
  __typename?: 'TripPaginationResult';
  items: Array<PlannedTripView>;
  pageInfo: PageInfo;
};

export type TripView = {
  __typename?: 'TripView';
  car: CarView;
  createdAt: Scalars['String']['output'];
  details: CombinedTripDetailsView;
  driver?: Maybe<UserProfileView>;
  driverReceipt?: Maybe<ReceiptView>;
  id: Scalars['ID']['output'];
  ownerReceipt?: Maybe<ReceiptView>;
  paymentIntentions: Array<PaymentIntentionView>;
  paymentStatus?: Maybe<Scalars['String']['output']>;
  pricing: TimeDistancePricingView;
};

export type UserCarFilter = {
  isDriver?: InputMaybe<Scalars['Boolean']['input']>;
  isOwner?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserProfileView = {
  __typename?: 'UserProfileView';
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<ImageFileView>;
};

export type UserView = {
  __typename?: 'UserView';
  address?: Maybe<AddressView>;
  cars: Array<CarView>;
  country: Scalars['String']['output'];
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  payoutAccount?: Maybe<PayoutAccountView>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};


export type UserViewCarsArgs = {
  filter?: InputMaybe<UserCarFilter>;
};

export type VehicleDataView = {
  __typename?: 'VehicleDataView';
  brand?: Maybe<Scalars['String']['output']>;
  firstAdmission?: Maybe<Scalars['String']['output']>;
  fuel?: Maybe<FuelView>;
  fuelPrice?: Maybe<HistoricalFuelPriceView>;
  length?: Maybe<Scalars['Float']['output']>;
  licensePlate: Scalars['ID']['output'];
  numberOfDoors?: Maybe<Scalars['Float']['output']>;
  numberOfSeats?: Maybe<Scalars['Float']['output']>;
  tradeName?: Maybe<Scalars['String']['output']>;
  wheelbase?: Maybe<Scalars['Float']['output']>;
};

export type CalculatorQueryVariables = Exact<{
  licensePlate: Scalars['ID']['input'];
}>;


export type CalculatorQuery = { __typename?: 'Query', vehicleData?: { __typename?: 'VehicleDataView', fuel?: { __typename?: 'FuelView', type: string, consumptionCombined?: number | null } | null, fuelPrice?: { __typename?: 'HistoricalFuelPriceView', price: { __typename?: 'MoneyView', currency: string, amount: number } } | null } | null };

export type DriverSharingRequestQueryVariables = Exact<{
  driverId: Scalars['ID']['input'];
}>;


export type DriverSharingRequestQuery = { __typename?: 'Query', userProfile?: { __typename?: 'UserProfileView', id: string, firstName: string, lastName: string, profilePicture?: { __typename?: 'ImageFileView', url?: string | null, metadata?: { __typename?: 'ImageFileMetadataView', width: number, height: number } | null } | null } | null };

export type OwnerSharingRequestQueryVariables = Exact<{
  carId: Scalars['ID']['input'];
}>;


export type OwnerSharingRequestQuery = { __typename?: 'Query', car?: { __typename?: 'CarView', id: string, name: string, description?: string | null, transmission?: string | null, profilePicture?: { __typename?: 'ImageFileView', url?: string | null, metadata?: { __typename?: 'ImageFileMetadataView', width: number, height: number } | null } | null, vehicleData?: { __typename?: 'VehicleDataView', licensePlate: string, numberOfDoors?: number | null, numberOfSeats?: number | null, firstAdmission?: string | null, fuel?: { __typename?: 'FuelView', type: string } | null } | null, location?: { __typename?: 'GeocodedLocationView', description: string } | null, tripPricing?: { __typename?: 'TimeDistancePricingView', minimumBillableHours: number, currency: string, distanceAllowance?: number | null, serviceFeePercentage: number, priceList: { __typename?: 'TimeDistancePriceList', distancePrice: number, timePrice: number } } | null, owner: { __typename?: 'UserProfileView', id: string, firstName: string, lastName: string, profilePicture?: { __typename?: 'ImageFileView', url?: string | null, metadata?: { __typename?: 'ImageFileMetadataView', width: number, height: number } | null } | null } } | null };


export const CalculatorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Calculator"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"licensePlate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vehicleData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"licensePlate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"licensePlate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fuel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"consumptionCombined"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuelPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CalculatorQuery, CalculatorQueryVariables>;
export const DriverSharingRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DriverSharingRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"driverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageFileMetadataView"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<DriverSharingRequestQuery, DriverSharingRequestQueryVariables>;
export const OwnerSharingRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OwnerSharingRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"carId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"car"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"carId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"carId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageFileMetadataView"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vehicleData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fuel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"licensePlate"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfDoors"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfSeats"}},{"kind":"Field","name":{"kind":"Name","value":"firstAdmission"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transmission"}},{"kind":"Field","name":{"kind":"Name","value":"tripPricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minimumBillableHours"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"distanceAllowance"}},{"kind":"Field","name":{"kind":"Name","value":"serviceFeePercentage"}},{"kind":"Field","name":{"kind":"Name","value":"priceList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distancePrice"}},{"kind":"Field","name":{"kind":"Name","value":"timePrice"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageFileMetadataView"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<OwnerSharingRequestQuery, OwnerSharingRequestQueryVariables>;