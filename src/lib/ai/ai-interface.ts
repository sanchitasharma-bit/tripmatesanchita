import { TripGenerationRequest, TripItinerary, TripModificationRequest } from '@/types';

export interface IAIProvider {
  readonly providerName: string;
  generateTrip(request: TripGenerationRequest): Promise<TripItinerary>;
  modifyTrip(request: TripModificationRequest): Promise<TripItinerary>;
}

