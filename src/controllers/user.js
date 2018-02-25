/**
 * Validates the session ID against a list of valid tokens.
 * Does not delete obsolete tokens.
 * @param sessionID - The session's ID which is used as the authentication token
 * @param tokens - The list of accepted tokens. Obtain from a user's model
 * @returns {boolean} - Whether the session ID is authenticated
 */
export const validateAuthorizationToken = (sessionID, tokens) => {
  const matchingTokens = tokens.filter(token =>
    token.expiry.getTime() > Date.now() && token.id === sessionID);
  return matchingTokens.length > 0;
};
