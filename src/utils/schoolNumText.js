const schoolNumText = (schoolNum) => {
  const Rule = /^[0-9]{10}$/
  return Rule.test(schoolNum)
}
export default schoolNumText
