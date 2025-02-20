import {
  Checkbox,
  Label,
  Option,
  OptionCover,
  OptionExpDiv,
  OptionImage,
  OptionP,
} from "../ShippingUpdateCss";

const OptionCheckbox = ({ option, index, setOption, service, options }) => {
  const handlCheckbox = (id) => {
    clickService(id);
    setOption((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...option, isSelcted: !option.isSelcted }
          : checkbox
      )
    );
  };
  const clickService = (e) => {
    const i = e.target.value;
    console.log(option[i]);
    if (option[i].isSelect) {
      option[i].isSelect = false;
      const index = service.findIndex(
        (service) => service.serviceNo === option[i].no
      );
      if (index !== -1) {
        service.splice(index, 1);
      }
    } else {
      option[i].isSelect = true;
      service.push({ serviceNo: option[i].no, serviceName: option[i].name });
      setOption(option);
    }
  };

  return (
    <>
      <Checkbox
        id={"ss" + index}
        value={index}
        name={options.value}
        checked={options.isSelect}
        onChange={handlCheckbox}
      />
      <Label htmlFor={"ss" + index}>
        <OptionCover>
          <OptionExpDiv>
            <OptionP>{options.name}</OptionP>
          </OptionExpDiv>
          <Option>
            <OptionImage src={options.image} />
          </Option>
        </OptionCover>
      </Label>
    </>
  );
};

export default OptionCheckbox;
