import { create } from 'zustand';
import { audioInstance } from "../utils/axios.audio.js";

export const useAudioStore = create((set, get) => ({
  latestAudio: null,
  allAudios: null,

  createWithUrl: async (payload) => {
    try {
      const res = await audioInstance.post(
        `/url?url=${payload.url}&voice=${payload.voice}&language=${payload.language}`
      );

      console.log("Audio created from URL:", res.data);

      await get().getLatestAudios();
      await get().getAllAudiosandLinks();

      return {
        success: true,
        data: res.data?.data,
        message: res?.data?.message,
      };
    } catch (err) {
      console.error("Failed to create audio from URL:", err);
      return {
        success: false,
        message: err?.response?.data?.message || "Something went wrong",
      };
    }
  },

  createWithPdf: async (payload) => {
    try {
      const res = await audioInstance.post("/pdf", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);

      await get().getLatestAudios();
      await get().getAllAudiosandLinks();

      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message,
      };
    }
  },

  createWithText: async (payload) => {
    try {
      const res = await audioInstance.post("/text", payload);

      console.log(res);

      await get().getLatestAudios();
      await get().getAllAudiosandLinks();

      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message,
      };
    }
  },

  getResponse: async (payload) => {
    try {
      const res = await audioInstance.post("/help", payload);

      console.log(res);
      return {
        success: true,
        data: res?.data?.data,
        message: res?.data?.message,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message,
      };
    }
  },

  getLatestAudios: async () => {
    try {
      let res = await audioInstance.get("/latest");
      console.log("Latest Audios:", res);
      set({ latestAudio: res?.data?.data });
    } catch (error) {
      console.log(error);
    }
  },

  getAllAudiosandLinks: async () => {
    try {
      let res = await audioInstance.get("/all");
      console.log("All Audios:", res);
      set({ allAudios: res?.data?.data });
    } catch (error) {
      console.log(error);
    }
  },
}));
