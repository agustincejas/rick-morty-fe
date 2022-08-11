import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Character } from '../../app/models/character.interface';
import { CharactersResponseInfo } from '../../app/models/recordsInfo.interface';
import { RootState } from '../../app/store';
import authHeader from '../../app/token';
const axios = require('axios');

export interface CharactersState {
  activeCharacter: Character;
  characters: Character[];
  recordsInfo: CharactersResponseInfo;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CharactersState = {
  activeCharacter: {} as Character,
  characters: [],
  recordsInfo: {} as CharactersResponseInfo,
  status: 'idle'
};

export interface getSingleCharacterPayload {
  id: number;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CHARACTERS_PATH = '/characters';

export const getAllCharacters = createAsyncThunk(
  'characters/all',
    async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${CHARACTERS_PATH}/`, { headers: authHeader() });
        return response.data;

      } catch (error) {
        console.log(error);
      }
    }
  );



export const getSingleCharacter = createAsyncThunk(
  'characters/single',
  async (payload: getSingleCharacterPayload, {getState}) => {
    const {characters}= getState() as { characters: CharactersState};
    const index = characters.characters.findIndex((char: Character) => char.id === payload.id);
    if(index !== -1) {
      return characters.characters[index];
    }

    try {
      const response = await axios.get(`${API_BASE_URL}${CHARACTERS_PATH}/${payload.id}`, { headers: authHeader() }, payload);
      const data = await response.data;
      return data;
    } catch (error) {
        console.log(error);
      }
  }
);


export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleCharacter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCharacters.fulfilled, (state, action) => {
        state.status = 'idle';
        state.characters = action.payload.results;
        state.recordsInfo = action.payload.info;
      })
      .addCase(getSingleCharacter.fulfilled, (state, action) => {
        state.status = 'idle';
        state.activeCharacter = action.payload;
      })
      .addCase(getAllCharacters.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getSingleCharacter.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export const selectAllCharacters = (state: RootState) => state.characters.characters;
export const selectStatus = (state: RootState) => state.characters.status;
export const selectSingleCharacter = (state: RootState) => state.characters.activeCharacter;


export default charactersSlice.reducer;
