import { GameState, GameAction } from './types';

export const initialGameState: GameState = {
  playerName: '',
  started: false,
  runId: '',
  currentEmailId: null,
  reviewed: [],
  decisions: {},
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;

    case 'START':
      return {
        ...initialGameState,
        playerName: action.name,
        started: true,
        runId: action.runId,
        currentEmailId: action.firstEmailId,
      };

    case 'OPEN_EMAIL':
      return { ...state, currentEmailId: action.emailId };

    case 'SUBMIT_DECISION': {
      const { emailId, decision, correct, ms } = action.payload;
      return {
        ...state,
        reviewed: state.reviewed.includes(emailId)
          ? state.reviewed
          : [...state.reviewed, emailId],
        decisions: {
          ...state.decisions,
          [emailId]: { decision, correct, ms },
        },
      };
    }

    default:
      return state;
  }
}
