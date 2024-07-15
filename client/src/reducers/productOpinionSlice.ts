import { createSlice } from "@reduxjs/toolkit";
import axios_instance from "../components/api/api_instance";
import { ProductOpinionType } from "../config/interface";

const initialState: ProductOpinionType = {
    reviews: [],
    questions: []
}

export const QuestionSlice = createSlice({
    name: 'productOpinion',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setReviews: (state, action) => {
            state.reviews = action.payload;
        }
    }
})

export const { setQuestions, setReviews } = QuestionSlice.actions;

export default QuestionSlice.reducer;