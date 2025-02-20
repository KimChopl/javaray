const requestPut = async (url) => {
  const response = await axios.put(`http://localhost/${url}`, formData, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export default requestPut;
