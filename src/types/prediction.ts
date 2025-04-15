
export interface PredictMoistRequest {
  temperature: number;
  humidity: number;
}

export interface PredictCropRequest {
  temperature: number;
  humidity: number;
  moisture: number;
}

export interface PredictionResponse {
  prediction: number | string;
}
