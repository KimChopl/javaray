import {
  Checkbox,
  CheckedLabel,
  Label,
  Option,
  OptionCover,
  OptionDiv,
  OptionExpDiv,
  OptionImage,
  OptionLine,
  OptionP,
} from "../ShippingUpdateCss";

export const OptionCheckbox = ({ options, service, setOption, setService }) => {
  const handleCheckbox = (e) => {
    const i = e.target.value;
    const isSelect = options[i].isSelect;
    if (isSelect) {
      options[i].isSelect = false;
      const newService = service.filter(
        (service) => service.serviceNo !== i + 1
      );
      setService(newService, "options");
    } else {
      options[i].isSelect = true;
      setService(
        [
          ...service,
          { serviceNo: options[i].no, serviceName: options[i].name },
        ],
        "options"
      );
    }
    setOption(options);
  };

  return options.map((option, index) => (
    <>
      <Checkbox
        id={"ss" + index}
        value={index}
        name={option.value}
        checked={option.isSelect}
        onChange={handleCheckbox}
      />
      <Label htmlFor={"ss" + index}>
        <OptionCover>
          <OptionExpDiv>
            <OptionP>{option.name}</OptionP>
          </OptionExpDiv>
          <Option>
            <OptionImage src={option.image} />
          </Option>
        </OptionCover>
      </Label>
    </>
  ));
};

export const ShowService = ({ option }) => {
  return (
    <OptionDiv>
      <OptionLine>
        {option.map((options) => {
          return (
            <CheckedLabel key={option.no}>
              <OptionCover>
                <OptionExpDiv>
                  <OptionP>{options.name}</OptionP>
                </OptionExpDiv>
                <Option>
                  <OptionImage src={options.image} />
                </Option>
              </OptionCover>
            </CheckedLabel>
          );
        })}
      </OptionLine>
    </OptionDiv>
  );
};
