// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0 ;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";


contract Faucet is Ownable {
  address payable owners;
  IERC20 public token;
  uint public withrawlAmount = 50 *(10**18);
  uint public locktime = 1 minutes;
  mapping (address => uint ) nextAccessTime;

  constructor(address tokenAddress) payable {
    token = IERC20(tokenAddress);
    owners = payable(msg.sender);
  }


  event Deposit (address indexed form , uint indexed amount);
  event withdraw( address indexed to, uint256 value);

  function requesttoken() public {
    require(msg.sender != address(0), "Request must not originate from a zero account");
    require(token.balanceOf(address(this))>= withrawlAmount,'Insufficient balance in faucet for withdrawl request');
    require(block.timestamp >= nextAccessTime[msg.sender], 'Insufficient time elapsed since last withdral - last again later');

    nextAccessTime[msg.sender] = block.timestamp + locktime;

    token.transfer(msg.sender, withrawlAmount);
  }

  receive() external payable {
    emit Deposit (msg.sender, msg.value);
  }

  function deposits(uint _amount) external {
    require(token.balanceOf(msg.sender) >= _amount,"Insufficient account balance");
    SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount*(10**18));
  }

  function getBalance() external view returns (uint) {
    return token.balanceOf(address(this));
  }

  function setWithdrawlAmount(uint amount ) public onlyOwner {
    withrawlAmount = amount *(10**18);
  }

  function setLocktime(uint amount ) public onlyOwner {
    locktime = amount * 1 minutes ;
  }


  function withdraws() external onlyOwner {
    emit withdraw( msg.sender, token.balanceOf(address(this)));
    token.transfer(msg.sender,token.balanceOf(address(this)));
    }

}