// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0 ;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";


contract Donate is Ownable {
  address payable owners;
  IERC20 public token;
  uint public donateAmount = 5 *(10**18);

  constructor(address tokenAddress) payable {
    token = IERC20(tokenAddress);
    owners = payable(msg.sender);
  }

  event Deposit (address indexed form , uint indexed amount);
  event withdraw( address indexed to, uint256 value);

  receive() external payable {
    emit Deposit (msg.sender, msg.value);
  }

  function deposit(uint _amount) external {
    require(token.balanceOf(msg.sender) >= _amount,"Insufficient account balance");
    require(_amount>= donateAmount,"");
    SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount*(10**18));
  }

  function getBalance() external view returns (uint) {
    return token.balanceOf(address(this));
  }

  function setDonateAmount(uint amount ) public onlyOwner {
    donateAmount = amount *(10**18);
  }

  function withdraws() external onlyOwner {
    emit withdraw( msg.sender, token.balanceOf(address(this)));
    token.transfer(msg.sender,token.balanceOf(address(this)));
    }

}