import moment from "moment";

const sheetId = '1f6NzXNVfJKK_xAVFr4beBoBD3gJ6zmalTigWN_G5g5A';
const apiKey = "AIzaSyBP8s-zVM5K7qLT5hbmsxy0xpQWtURwmD0";
const tab_name = "Answers";

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${tab_name}?alt=json&key=${apiKey}`;
const fetchUsers = async () => {
  // Parse reponse
  const result = await fetch(url);
  const json = await result.text();
  const jsonData = JSON.parse(json);
  jsonData.values.splice(0, 1);

  // Prepare data
  const users = [];
  for (let user of jsonData.values) {
    if (user.length > 0) {
      console.log('user' , user)
      let tmp = {
        'id': user[0],
        'name': user[1],
        'dob': moment(user[2], 'DD/MM/YYYY'),
        'hob': user[6],
        'content': user[3],
        'meet_at': moment(user[4], 'DD/MM/YYYY hh:mm:ss'),
        'image': user[5]
      }
      users.push(tmp);
    }
  }
  return users;
}

export { fetchUsers };

