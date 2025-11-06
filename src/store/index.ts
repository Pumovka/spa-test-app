import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('products/get', async () => {
    const res = await axios.get('https://fakestoreapi.com/products')
    return res.data
})

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [] as any[],
        loading: false
    },
    reducers: {
        addProduct: (state, action) => {
            const newProd = { id: Date.now(), ...action.payload, liked: false }
            state.list.push(newProd)
        },
        toggleLike: (state, action) => {
            const prod = state.list.find(p => p.id === action.payload)
            if (prod) prod.liked = !prod.liked
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getProducts.pending, (state) => { state.loading = true })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.list = action.payload
                state.loading = false
            })
    }
})

export const { addProduct, toggleLike } = productsSlice.actions

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
