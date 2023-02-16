export function loginMoch({ email, password }) {
  const delay = (0.7 + Math.random() * 2) * 2000;

  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (password === 'password123' && !!email) {
        resolve({delay: delay});
      } else {
        reject({ 
          message: 'You have entered an invalid username or password',
          delay: delay,
        });
      }
    }, delay);
  });
}