from Crypto.Protocol.KDF import PBKDF2
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad


def encrypt(user, pname, password):
  secure = AES.new(PBKDF2(user.name.encode(), pname.encode()), AES.MODE_CBC)
  return (secure.iv + secure.encrypt(pad(password.encode(), AES.block_size))).decode('cp850')


def decrypt(user, pname, password):
  print(password)
  password = password.encode('cp850')
  print(password)
  secure = AES.new(PBKDF2(user.name.encode(), pname.encode()),
                   AES.MODE_CBC, password[:16])
  return unpad(secure.decrypt(password[16:]), AES.block_size).decode('cp850')


# Yesh@123
