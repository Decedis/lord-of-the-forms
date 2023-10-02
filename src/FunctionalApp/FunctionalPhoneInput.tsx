export const FunctionalPhoneInput = () => {
  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input type="text" id="phone-input-1" placeholder="55" maxLength={2} />
        -
        <input type="text" id="phone-input-2" placeholder="55" maxLength={2} />
        -
        <input type="text" id="phone-input-3" placeholder="55" maxLength={2} />
        -
        <input type="text" id="phone-input-4" placeholder="5" maxLength={1} />
      </div>
    </div>
  );
};
