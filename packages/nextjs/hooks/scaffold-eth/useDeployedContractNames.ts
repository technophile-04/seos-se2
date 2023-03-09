import { useEffect, useState } from "react";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * @dev use this hook to get the list of contracts deployed by `yarn deploy`.
 * @returns {string[]} array of contract names
 */
export const useDeployedContractNames = () => {
  const configuredChain = getTargetNetwork();
  const [deployedContractNames, setDeployedContractNames] = useState<string[]>([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const contracts = require("~~/contracts/hardhat_contracts.json");
      console.log("contracts", contracts);
      const contractsAtChain = contracts[`${configuredChain.id}` as keyof typeof contracts];
      const contractsData = contractsAtChain?.[0]?.contracts;
      console.log("contractsData", contractsData);
      const contractNames = contractsData ? Object.keys(contractsData) : [];
      console.log("contractNames", contractNames);

      setDeployedContractNames(contractNames);
    } catch (e) {
      console.log("e", e);
      // File doesn't exist.
      setDeployedContractNames([]);
    }
  }, [configuredChain.id]);

  return deployedContractNames;
};
