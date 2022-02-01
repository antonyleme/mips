import {
  parseRd,
  parseRt,
  parseRs,
  parseImm,
  parseOffset,
} from '../helpers/parsers';

import ACTIONS_MAP from './actions-map';

/* Instrução correspondente a rd = rs + rt */
export const add = (
  binaryInstruction,
  action,
  registers,
  createRegisterIfItDoesntExist
) => {
  const rs = parseRs(binaryInstruction);
  const rt = parseRt(binaryInstruction);
  const rd = parseRd(binaryInstruction);

  if (action === ACTIONS_MAP.DECODE) {
    return `ADD R${rd}, R${rs}, R${rt}`;
  }

  if (action === ACTIONS_MAP.EXECUTE) {
    createRegisterIfItDoesntExist(rs);
    createRegisterIfItDoesntExist(rt);

    return {
      stallLocation: `R${rd}`,
      stallAmount: 2,
      register: {
        name: `R${rd}`,
        value:
          registers.find((r) => r.name === `R${rs}`)?.value +
          registers.find((r) => r.name === `R${rt}`)?.value,
      },
      memory: null,
      shouldBranch: false,
      branchOffset: 0,
    };
  }

  //SHOULD_STALL
  return [`R${rs}`, `R${rt}`];
};

/* Instrução correspondente a rd = rs - rt */
export const sub = (
  binaryInstruction,
  action,
  registers,
  createRegisterIfItDoesntExist
) => {
  const rs = parseRs(binaryInstruction);
  const rt = parseRt(binaryInstruction);
  const rd = parseRd(binaryInstruction);

  if (action === ACTIONS_MAP.DECODE) {
    return `SUB R${rd}, R${rs}, R${rt}`;
  }

  if (action === ACTIONS_MAP.EXECUTE) {
    createRegisterIfItDoesntExist(rs);
    createRegisterIfItDoesntExist(rt);

    return {
      stallLocation: `R${rd}`,
      stallAmount: 2,
      register: {
        name: `R${rd}`,
        value:
          registers.find((r) => r.name === `R${rs}`)?.value -
          registers.find((r) => r.name === `R${rt}`)?.value,
      },
      memory: null,
      shouldBranch: false,
      branchOffset: 0,
    };
  }

  //SHOULD_STALL
  return [`R${rs}`, `R${rt}`];
};

/**
 *  Instrução correspondente a slt rd, rs, rt
 *  if(rs < rt) rd = 1, else rd = 0
 * */
export const setOnLessThan = (
  binaryInstruction,
  action,
  registers,
  createRegisterIfItDoesntExist
) => {
  const rs = parseRs(binaryInstruction);
  const rt = parseRt(binaryInstruction);
  const rd = parseRd(binaryInstruction);

  if (action === ACTIONS_MAP.DECODE) {
    return `SLT R${rd}, R${rs}, R${rt}`;
  }

  if (action === ACTIONS_MAP.EXECUTE) {
    createRegisterIfItDoesntExist(rs);
    createRegisterIfItDoesntExist(rt);

    return {
      stallLocation: `R${rd}`,
      stallAmount: 2,
      register: {
        name: `R${rd}`,
        value:
          registers.find((r) => r.name === `R${rs}`)?.value <
          registers.find((r) => r.name === `R${rt}`)?.value
            ? 1
            : 0,
      },
      memory: null,
      shouldBranch: false,
      branchOffset: 0,
    };
  }

  //SHOULD_STALL
  return [`R${rs}`, `R${rt}`];
};

/**
 *  Instrução correspondente a addi rs, rt, imm
 *  rt = rs + imm
 * */
export const addi = (
  binaryInstruction,
  action,
  registers,
  createRegisterIfItDoesntExist
) => {
  const rs = parseRs(binaryInstruction);
  const rt = parseRt(binaryInstruction);
  const imm = parseImm(binaryInstruction);

  if (action === ACTIONS_MAP.DECODE) {
    return `ADDI R${rt}, R${rs}, ${imm}`;
  }

  if (action === ACTIONS_MAP.EXECUTE) {
    createRegisterIfItDoesntExist(rs);

    return {
      stallLocation: `R${rt}`,
      stallAmount: 2,
      register: {
        name: `R${rt}`,
        value: registers.find((r) => r.name === `R${rs}`)?.value + imm,
      },
      memory: null,
      shouldBranch: false,
      branchOffset: 0,
    };
  }

  //SHOULD_STALL
  return [`R${rs}`];
};

/**
 *  Instrução correspondente a beq rs, rt, offset
 *  if(rs == rt) advance pc offset << 2
 * */
export const branchOnEqual = (
  binaryInstruction,
  action,
  registers,
  createRegisterIfItDoesntExist
) => {
  const rs = parseRs(binaryInstruction);
  const rt = parseRt(binaryInstruction);
  const offset = parseOffset(binaryInstruction);

  if (action === ACTIONS_MAP.DECODE) {
    return `BEQ R${rt}, R${rs}, ${offset}`;
  }

  if (action === ACTIONS_MAP.EXECUTE) {
    createRegisterIfItDoesntExist(rs);
    createRegisterIfItDoesntExist(rt);

    const isEqual =
      registers.find((r) => r.name === `R${rs}`)?.value ===
      registers.find((r) => r.name === `R${rt}`)?.value;

    return {
      stallLocation: `R${rt}`,
      stallAmount: 0,
      register: null,
      memory: null,
      shouldBranch: isEqual ? true : false,
      branchOffset: isEqual ? offset : 0,
    };
  }

  //SHOULD_STALL
  return [`R${rs}`, `R${rt}`];
};

/**
 *  Instrução correspondente a beq rs, rt, offset
 *  if(rs == rt) advance pc offset << 2
 * */
export const branchNotEqual = (
  binaryInstruction,
  action,
  registers,
  createRegisterIfItDoesntExist
) => {
  const rs = parseRs(binaryInstruction);
  const rt = parseRt(binaryInstruction);
  const offset = parseOffset(binaryInstruction);

  if (action === ACTIONS_MAP.DECODE) {
    return `BNE R${rt}, R${rs}, ${offset}`;
  }

  if (action === ACTIONS_MAP.EXECUTE) {
    createRegisterIfItDoesntExist(rs);
    createRegisterIfItDoesntExist(rt);

    const isNotEqual =
      registers.find((r) => r.name === `R${rs}`)?.value !==
      registers.find((r) => r.name === `R${rt}`)?.value;

    return {
      stallLocation: `R${rt}`,
      stallAmount: 0,
      register: null,
      memory: null,
      shouldBranch: isNotEqual ? true : false,
      branchOffset: isNotEqual ? offset : 0,
    };
  }

  //SHOULD_STALL
  return [`R${rs}`, `R${rt}`];
};

/**
 *  Instrução correspondente a lw rt, offset(rs)
 *  rt = MEM[rs + offset]
 * */
export const loadWord = (
  binaryInstruction,
  action,
  registers,
  memories,
  createRegisterIfItDoesntExist
) => {
  const rs = parseRs(binaryInstruction);
  const rt = parseRt(binaryInstruction);
  const offset = parseOffset(binaryInstruction);

  if (action === ACTIONS_MAP.DECODE) {
    return `BNE R${rt}, R${rs}, ${offset}`;
  }

  if (action === ACTIONS_MAP.EXECUTE) {
    createRegisterIfItDoesntExist(rs);
    createRegisterIfItDoesntExist(rt);

    return {
      stallLocation: `R${rt}`,
      stallAmount: 2,
      register: {
        name: `R${rt}`,
        value:
          memories[registers.find((r) => r.name === `R${rs}`)?.value + offset],
      },
      memory: null,
      shouldBranch: false,
      branchOffset: 0,
    };
  }

  //SHOULD_STALL
  return [`R${rs}`, `R${rt}`];
};

/**
 *  Instrução correspondente a sw rt, offset(rs)
 *  MEM[rs + offset] = rt
 * */
export const storeWord = (
  binaryInstruction,
  action,
  registers,
  createRegisterIfItDoesntExist
) => {
  const rs = parseRs(binaryInstruction);
  const rt = parseRt(binaryInstruction);
  const offset = parseOffset(binaryInstruction);

  if (action === ACTIONS_MAP.DECODE) {
    return `SW R${rt}, ${offset}(R${rs})`;
  }

  if (action === ACTIONS_MAP.EXECUTE) {
    createRegisterIfItDoesntExist(rs);
    createRegisterIfItDoesntExist(rt);

    return {
      stallAmount: 0,
      register: null,
      memory: {
        position: registers.find((r) => r.name === `R${rs}`)?.value + offset,
        value: registers.find((r) => r.name === `R${rt}`)?.value,
      },
      shouldBranch: false,
      branchOffset: 0,
    };
  }

  //SHOULD_STALL
  return [`R${rs}`, `R${rt}`];
};
