
import { useMutation } from "@tanstack/react-query";
import { PredictMoistRequest, PredictCropRequest, PredictionResponse } from "@/types/prediction";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:8080";

export const useMoisturePrediction = () => {
  return useMutation({
    mutationFn: async (data: PredictMoistRequest): Promise<PredictionResponse> => {
      const response = await fetch(`${API_BASE_URL}/data/predict-moisture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperature: data.temperature,
          humidity: data.humidity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to predict moisture');
      }

      return response.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useCropPrediction = () => {
  return useMutation({
    mutationFn: async (data: PredictCropRequest): Promise<PredictionResponse> => {
      const response = await fetch(`${API_BASE_URL}/data/predict-crop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperature: data.temperature,
          humidity: data.humidity,
          moisture: data.moisture,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to predict crop');
      }

      return response.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
