module Blockchain
  class TransactionsController < ApplicationController
    layout "blockchain"

    def show
      @transaction = Transaction.find(params[:id])
    end

    def index
      @transactions = Transaction
    end
  end
end