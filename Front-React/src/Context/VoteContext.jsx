

import React, { createContext, useState, useContext, useCallback } from 'react';
import { ROUTES } from '../Constants/Routes';

const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [voteData, setVoteData] = useState({
    type: null,
    partido: null,
    list: null,
    timestamp: null,
    circuito: null,
  });

  const resetVote = useCallback(() => {
    setVoteData({
      type: null,
      partido: null,
      list: null,
      timestamp: null,
      circuito: null
    });
  }, []);

  const setVoteType = useCallback((type) => {
    setVoteData(prev => ({ ...prev, type }));
  }, []);

  const setSelectedPartido = useCallback((partido) => {
    setVoteData(prev => ({ ...prev, partido }));
  }, []);

  const setSelectedList = useCallback((list) => {
    setVoteData(prev => ({ ...prev, list, timestamp: new Date().toISOString() }));
  }, []);

  const setCircuito = useCallback((circuito) => {
    setVoteData(prev => ({ ...prev, circuito }));
  }, []);

  return (
    <VoteContext.Provider
      value={{
        voteType: voteData.type,
        selectedPartido: voteData.partido,
        selectedList: voteData.list,
        voteTimestamp: voteData.timestamp,
        circuito: voteData.circuito,
        setVoteType,
        setSelectedPartido,
        setSelectedList,
        setCircuito,
        resetVote,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVote = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVote must be used within a VoteProvider');
  }
  return context;
};