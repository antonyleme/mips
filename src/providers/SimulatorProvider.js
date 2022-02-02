import React, { createContext, useCallback, useEffect, useState } from 'react';
import {
  add,
  sub,
  setOnLessThan,
  addi,
  branchOnEqual,
  branchNotEqual,
  loadWord,
  storeWord,
  and,
  or,
  j,
  jal,
  // jr,
} from '../helpers/instructions';
import sort from '../helpers/sort';
import ACTIONS_MAP from '../helpers/actions-map';

export const SimulatorContext = createContext();

function SimulatorProvider({ children }) {
  const [file, setFile] = useState();
  const [text, setText] = useState();

  const [submited, setSubmited] = useState(false);

  const [instructions, setInstructions] = useState([]);
  const [registers, setRegisters] = useState([]);
  const [memories, setMemories] = useState([]);
  const [cycles, setCycles] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);

  const [pcCounter, setPcCounter] = useState(0);
  const [cycleCounter, setCycleCounter] = useState(0);

  /*Função submit do form que define se vai ser direto ou passo a passo*/
  const submit = (option) => {
    if (option === 'direct') {
      setSubmited(true);
      return simulate();
    }

    simulate();
    setSubmited(true);
  };

  /* Função para resetar todos os states*/
  const reset = () => {
    setInstructions([]);
    setRegisters([]);
    setMemories([]);
    setCycles([]);
    setCurrentStep(0);
    setPcCounter(0);
    setCycleCounter(0);
    setSubmited(false);
  };

  /* Função para adicionar novo registrador no state */
  const addRegister = (name, value) => {
    setRegisters((oldRegisters) => [...oldRegisters, { name, value }]);
  };

  /* Função para adicionar nova memória no state */
  const addMemory = (position, value) => {
    setMemories((oldMemories) => [...oldMemories, { position, value }]);
  };

  /* Função para adicionar nova instrução no state */
  const addInstructions = useCallback((instruction) => {
    setInstructions((oldInstructions) => [...oldInstructions, instruction]);
  }, []);

  /* Função para iniciar a simulação*/
  const simulate = () => {
    if (file) readFile();
    if (text) readText();
  };

  /* Função para ler o texto do input text*/
  const readText = () => {
    loadInstructions(text);
    loadRegisters(text);
    startExecution();
  };

  /* Função para ler o arquivo do input e setar o txt no state*/
  const readFile = () => {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = function (evt) {
      loadInstructions(evt.target.result);
      loadRegisters(evt.target.result);
      startExecution();
    };
  };

  /* Função para percorrer as linhas do txt com uma flag de inicio e parada e uma função para ação */
  const goThroughLines = useCallback(
    (text, startFlag, stopFlag, addFunction) => {
      const lines = text.split('\n');
      for (let line = 0; line < lines.length - 1; line++) {
        if (lines[line] === startFlag) {
          let currentLine = line + 1;
          while (lines[currentLine] !== stopFlag) {
            const splittedLine = lines[currentLine].split(' ');
            const value1 = splittedLine[0];
            const value2 = splittedLine[1];

            addFunction(value1, value2);
            currentLine++;
          }
          line = currentLine;
        }
      }
    },
    []
  );

  /* Função para salvar os registradores do arquivo TXT */
  const loadRegisters = useCallback(
    (text) => {
      goThroughLines(text, 'REGISTERS', 'CODE', addRegister);
    },
    [goThroughLines]
  );

  /* Função para criar registrador se ele não existe */
  const createRegisterIfItDoesntExist = useCallback(
    (registerNumber) => {
      const newRegisters = [
        ...registers,
        {
          name: `R${registerNumber}`,
          value: 0,
        },
      ].sort((a, b) => sort(a, b, 'name'));

      setRegisters(newRegisters);
    },
    [registers]
  );

  /* Função para pegar a instrução a partir do código binário */
  const getInstruction = useCallback(
    (binaryString, action) => {
      binaryString = binaryString.trim();
      const opcode = binaryString.substring(0, 6);

      const instructionsMap = {
        100000: add(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        100010: sub(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        101010: setOnLessThan(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        '001000': addi(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        '000100': branchOnEqual(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        '000101': branchNotEqual(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        100011: loadWord(
          binaryString,
          action,
          registers,
          memories,
          createRegisterIfItDoesntExist
        ),
        101011: storeWord(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        100100: or(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        100101: and(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        '000010': j(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        '000011': jal(
          binaryString,
          action,
          registers,
          createRegisterIfItDoesntExist
        ),
        // '001000': jr(
        //   binaryString,
        //   action,
        //   registers,
        //   createRegisterIfItDoesntExist
        // ),
      };

      if (opcode === '000000') {
        const instruction = binaryString.substring(26);
        return instructionsMap[instruction];
      }

      return instructionsMap[opcode];
    },
    [memories, registers, createRegisterIfItDoesntExist]
  );

  const loadInstructions = useCallback(
    (text) => {
      const lines = text.split('\n');
      for (let line = 0; line < lines.length - 1; line++) {
        if (lines[line] === 'CODE') {
          let currentLine = line + 1;
          while (currentLine < lines.length) {
            const opcode = lines[currentLine];
            addInstructions(getInstruction(opcode, ACTIONS_MAP.DECODE));
            currentLine++;
          }
          line = currentLine;
        }
      }
    },
    [getInstruction, addInstructions]
  );

  const startExecution = () => {
    setPcCounter(1);
  };

  useEffect(() => {}, [pcCounter]);

  return (
    <SimulatorContext.Provider
      value={{
        submit,
        file,
        setFile,
        text,
        setText,
        submited,
        setSubmited,
        reset,
        createRegisterIfItDoesntExist,
        memories,
        registers,
        instructions,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
}

export default SimulatorProvider;
